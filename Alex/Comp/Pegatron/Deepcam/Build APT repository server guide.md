# Build APT repository server guide

[TOC]

## 0. Prepare

`sudo apt-get install reprepro gnupg2 nginx`

## 1. Server side

| IP      |     USER |   PASSWORD   | Key passphrase| Domain name|
| :--------: | :--------:| :------: |:------: |:------: |
| 172.18.191.22    |   decamuser |  88888888  | a26842684| deeplens.pegatroncorp.com|

### 1-1. Generate signing keys

- Generate key pair for packages and your repository

```bash
gpg2 --full-gen-key
```

- Specify the first option, “RSA and RSA (default)” `1`

```bash
gpg (GnuPG) 2.1.11; Copyright (C) 2016 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection? 1
```

Hit `Enter` and you’ll be prompted for a keysize:

```bash
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 4096
```

Press `Enter` for the expire prompt.

```bash
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 0
```

- Hit `Enter`, then `y`. You will be prompted to generate a `user ID`
If the information is correct, hit `o` and Enter.

```bash
You need a user ID to identify your key; the software constructs the user ID
from the Real Name, Comment and Email Address in this form:
    "Heinrich Heine (Der Dichter) <heinrichh@duesseldorf.de>"

Real name: <Key Name>
Email address: <Your email address>
Comment: 
You selected this USER-ID:
    "<Key Name> <Your email address>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? o
```

- Input a passphrase for your keys

``` bash
You need a Passphrase to protect your secret key.

Enter passphrase: 
Repeat passphrase:
```

- Now we have a master key

```bash
$ gpg2 --list-keys
/home/alex/.gnupg/pubring.gpg
-----------------------------
pub   rsa4096/E9C5A563 2017-11-02 [SC]
uid                  AlexHoh <Alex_Hoh@pegatroncorp.com>
sub   rsa4096/5BD52637 2017-11-02 [E]
```

> If you hangs at gaining enough entropy and show the message:
>
> **We need to generate a lot of random bytes. It is a good idea to perform some other action (type on the keyboard, move the mouse, utilize the disks) during the prime generation; this gives the random number generator a better chance to gain enough entropy.**
>
> You can log in to another shell and start a command:
> `sudo dd if=/dev/sda of=/dev/zerols`

### 1-2. Generate a Subkey for Package Signing

- `gpg2 --edit-key $KEYNAME`

```bash
gpg (GnuPG) 2.1.11; Copyright (C) 2016 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

sec  rsa4096/E9C5A563
 created: 2017-11-02  expires: never       usage: SC
        trust: ultimate      validity: ultimate
ssb  rsa4096/5BD52637
 created: 2017-11-02  expires: never       usage: E
[ultimate] (1). AlexHoh <Alex_Hoh@pegatroncorp.com>

gpg>
```

- Type `addkey` and press `Enter`,You will see the following prompt for key type.

```bash
Please select what kind of key you want:
   (3) DSA (sign only)
   (4) RSA (sign only)
   (5) Elgamal (encrypt only)
   (6) RSA (encrypt only)
Your selection? 4
```

- Type `4096`

```bash
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 4096
```

- Press `Enter` and then type `y` (yes) twice for the next two prompts.

```bash
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0)
```

```bash
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
............+++++
.+++++

sec  rsa4096/E9C5A563
     created: 2017-11-02  expires: never       usage: SC 
     trust: ultimate      validity: ultimate
ssb  rsa4096/5BD52637
     created: 2017-11-02  expires: never       usage: E
ssb  rsa4096/B6EEDD0C
     created: 2017-11-02  expires: never       usage: S 
[ultimate] (1). AlexHoh <Alex_Hoh@pegatroncorp.com>

gpg>
```

- Type `save` at the prompt.

> In the output above, the `SC` from our master key tells us that the key is only for signing and certification.
>
> The `E` means the key may only be used for encryption.
>
> Our signing key can be correctly seen with only the `S`.

- Note your master key’s ID (the example shows `E9C5A563` on the second sub line above).

### 1-3. Detach Master Key From Subkey

- ***Export the key pair and you have backed up this file to a safe location***

```bash
gpg2 -a --export-secret-key E9C5A563 > private.key
gpg2 -a --export E9C5A563 > public.key
gpg2 -a --export-secret-subkeys E9C5A563 > subkeys.key
```

> Import keys：
> `gpg2 --import subkeys.key`
> `gpg2 --import private.key public.key`

> Remove keys：
> `gpg --delete-secret-keys AlexHoh`
> `gpg --delete-key AlexHoh`

> Check keys：
> `gpg2 --list-secret-keys`

### 1-4. Make reprepro config file

- Create a folder for save reprepro configure files

``` bash
mkdir /var/spool/reprepro
mkdir /var/spool/reprepro/conf
```

- Create configure file:`/var/spool/reprepro/conf/distributions`
In option`SignWith`, input your `private key id`
Example:`B6EEDD0C`

``` bash
Origin: PEGATRON
Label: PEGATRON
Codename: awscamfirmware
Suite: stable
Version: 16.04
Architectures: i386 amd64
Components: main
Description: Update firmware
SignWith: B6EEDD0C
```

- Create configure file:`/var/spool/reprepro/conf/options`

``` bash
verbose
ask-passphrase
component main
architecture i386|amd64
```

### 1- 5. Sign and publish deb

- Create a folder at your web server :
`sudo mkdir /var/www/html/apt`
`sudo mkdir /var/www/html/apt/key`
- Copy your `public.key` file to `/var/www/html/apt/key` or send key to ubuntu keys server
`gpg2 --keyserver keyserver.ubuntu.com --send-key B6EEDD0C`
- Create a shell script for sign and publish deb to `/var/www/html/apt`:

`publish.sh`

``` bash
#!/bin/bash
 
BASEDIR="/var/spool/reprepro"
FTP_HOME="/var/www/html"
DEBIAN_HOME="${FTP_HOME}/apt"
DEBIAN_DIST="awscamfirmware"
 
if [ "$1" == "x" ]; then
  DEB="/usr/src/debian/debs/*.deb"
else
  DEB=$*
fi
if [ ! -d "${FTP_HOME}" ]; then
  echo "directory not exists: ${FTP_HOME}"
  exit
fi
if [ ! -d "${DEBIAN_HOME}" ]; then
  mkdir "${DEBIAN_HOME}"
fi
reprepro --basedir "${BASEDIR}" --outdir="${DEBIAN_HOME}" includedeb "${DEBIAN_DIST}" ${DEB}
```

- Execute: `sudo ./publish.sh $YOUR_DEB`

&nbsp;

## 2. Client Side

- Add public key

```bash
sudo su
wget -O - http://<your deb server IP address>/apt/key/public.key | apt-key add -
```

or

```bash
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B6EEDD0C
```

- Open `/etc/apt/sources.list` and add this line:

```bash
deb http://<your deb server IP address>/apt awscamfirmware main
```

or

```bash
add-apt-repository "deb http://<your deb server IP address>/apt awscamfirmware main"
```

```bash
Example:
add-apt-repository "deb https://deeplens.pegatroncorp.com/apt awscamfirmware main"
```

- Update repository server list

```bash
sudo apt-get update
```

- Install debian package

```bash
sudo apt-get install <deb name>
```
