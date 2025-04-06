# Issue List

[TOC]

## BKC 18WW45.5

### 1. Every device will have the same nginx key pair and web service password

When install the **aws-deepracer-webserver_1.0.101.0_amd64.deb** in the device that we making the shipping image, `preinst` will be triggered and execute `nginx_install_certs.sh` to generate the nginx key pair. And using **/sys/class/dmi/id/chassis_asset_tag** to create the hash and save it in **/opt/aws/deepracer/password.txt**.

But at this time, the **/sys/class/dmi/id/chassis_asset_tag** contained in the device we used to make the shipping image is not the unique value written by the factory for each device, but only a default value (value=*Chassis Asset Tag*). And there is no chance to execute `nginx_install_certs.sh` again. It cause the content in `/opt/aws/deepracer/password.txt` is same at every device finally.

`nginx_install_certs.sh`

```bash
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj 

# Creating the webserver default username and password (deepracer)
python $ROOT_DIR/reset_default_password.py
```

`reset_default_password.py`

``` python
DESTINATION_PATH = '/opt/aws/deepracer/password.txt'
DEFAULT_PASSWORD_PATH = '/sys/class/dmi/id/chassis_asset_tag'

def reset_default():
    if(os.path.exists(DEFAULT_PASSWORD_PATH)):
        default_pass = open(DEFAULT_PASSWORD_PATH, "r").readline().strip()
        LOG.info("Default password file found")
    else:
        default_pass = 'deepracer'
        LOG.info("Default password file not found")
    pwd_file = open(DESTINATION_PATH, "w")
    pwd_file.write(hashlib.sha224(default_pass).hexdigest())
    pwd_file.close()
    LOG.info("Password reset to default")


if __name__ == '__main__':
    reset_default()
```

### 2. Camera LED is not used

So far, I have not seen any part of code to control the camera LED. This is inconsistent with the behavior required  **LED ON/OFF WITH CAMERA ON/OFF** in OQC camera test requirement.

### 3. Tail LED is not used

The OQC test is based on the behavior of the end user, but I have not seen any part of code to control the tail LED. If it’s the expected result, please ignore this issue.

### 4. User name change from aws_car to deepracer

The `postinst` in **aws-deepracer-util_1.0.21.0_amd64.deb**  Indicates that you want to set the username from `aws_car` to `deepracer`. Please confirm the username in the finial shipping image.

`postinst`

```bash
mkdir -p /media/deepracer/DEEPRACER
mount /dev/mmcblk0p3 /media/deepracer/DEEPRACER
mkdir -p /media/deepracer/DEEPRACER/models
if [ ! -f /media/deepracer/DEEPRACER/wifi-creds.txt ]; then
    echo "ssid     : <wifi-ssid>" > /media/deepracer/DEEPRACER/wifi-creds.txt
    echo "password : <wifi-password>" >> /media/deepracer/DEEPRACER/wifi-creds.txt
fi
umount /media/deepracer/DEEPRACER

```

### 5. SMBIOS

Currently, the capsule of BIOS will restore the SMBIOS region to default value when update successfully. Please update `platform.ini`. This file is in the `SecurityFlash` folder of Capsule.
