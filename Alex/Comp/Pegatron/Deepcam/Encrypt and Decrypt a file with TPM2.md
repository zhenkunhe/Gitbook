# Encrypt and Decrypt a file with TPM2

[TOC]

## 1. Prepare tpm2 tools and Start daemon

- Install **tpm2-tools** to test TCTI command from <https://github.com/intel/tpm2-tools>

```bash
sudo apt install tpm2-tools
```

- Start TPM2 service daemon

```bash
$ sudo resourcemgr 

Initializing local TPM Interface
Initializing Resource Manager
maxActiveSessions = 64
gapMaxValue = 65535
socket created:  0x4
bind to IP address:port:  127.0.0.1:2324
Other CMD server listening to socket:  0x4
socket created:  0x5
bind to IP address:port:  127.0.0.1:2323
TPM CMD server listening to socket:  0x5
Starting SockServer (TPM CMD), socket: 0x5.
Starting SockServer (Other CMD), socket: 0x4.
```

## 2. Create a RSA key and load both the private and public key into the TPM

- Open another terminal and create owner password.

```bash
$ tpm2_takeownership -o <YourOwnerPW> -e <YourEndorsePW> -l <YourLockPW>
......Change Hierarchy Owner Auth Succ......

......Change Hierarchy Endorsement Auth Succ......

......Change Hierarchy Lockout Auth Succ......
```

- Create a **Primary Seed** and load a RSA key

```bash
$ tpm2_createprimary -A e -g 0x000b -G 0x0001 -C po.ctx -P <YourEndorsePW>
nameAlg = 0x000b
type = 0x0001
contextFile = po.ctx

CreatePrimary Succeed ! Handle: 0x80000000
```

```bash
$ tpm2_create -c po.ctx -g 0x000b -G 0x0001 -o key.pub -O key.priv
contextParentFile = po.ctx
nameAlg = 0x000b
type = 0x0001
ObjectAttribute: 0x00060072

Create Object Succeed !
```

```bash
$ tpm2_load -c po.ctx -u key.pub -r key.priv -n key.name -C obj.ctx
contextParentFile = po.ctx
contextFile = obj.ctx

Load succ.
LoadedHandle: 0x8000000e
```

## 3. Encrypt a file with RSA key

- Create a data file

```bash
$ echo "12345678" > data.in
12345678
```

- Encrypt the file with RSA key

```bash
$ tpm2_rsaencrypt -c obj.ctx -I data.in -o data.in.encrypted
contextKeyFile = obj.ctx

RSA Encrypt succ.
OutFile data.in.encrypted completed!
```

- Check the encrypted file

```bash
$ cat data.in.encrypted
Чv�H�?}�k���?w%��?���O�YH�M��T�z����?O�<�Ħ�+��q(3��?���H*իAk8<
8�s}�    IO?�?����$�#n8��0F)SjE�۰*�q@�?^F^�����Q�JDy�Ǽ�C�@ j����Г?�5�Ӥ�^�b��RD��ܸ�8���Y
```

## 4. Decrypt a file with RSA key

- Check the encrypted file

```bash
$ cat data.in.encrypted
Чv�H�?}�k���?w%��?���O�YH�M��T�z����?O�<�Ħ�+��q(3��?���H*իAk8<
8�s}�    IO?�?����$�#n8��0F)SjE�۰*�q@�?^F^�����Q�JDy�Ǽ�C�@ j����Г?�5�Ӥ�^�b��RD��ܸ�8���Y
```

- Decrypt the file with RSA key

```bash
$ tpm2_rsadecrypt -c obj.ctx -I data.in.encrypted -o data.out
contextKeyFile = obj.ctx

RSA Decrypt succ.
OutFile data.out completed!
```

- Check the Decrypted file

```bash
$ cat data.out
12345678
```
