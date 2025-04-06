# Generate Keys for sign BIOS

[TOC]

## 1. Generate and import a key pair

- The key pair for sign BIOS, bootloader, kernel and kernel module.
- Use Microsoft **makecert.exe** and **pvk2pfx.exe** tools (in Windows 10 SDK) to generate key pair.
- They are included in Visual Studio. Install visual studio on you host and open `Developer Command Prompt for VS 2017`
![Alt text|center](images/1515739393221.png)

- Use **MakeKey.bat** in security flash package
![Alt text|center](images/1515739426804.png)

- Click `OK`
![Alt text|center](images/1515739453708.png)

- Click `Yes`
![Alt text|center](images/1515739688131.png)

- Check your `CerTest.pfx` has been generated
![Alt text|center](images/1515739771269.png)

- Double click `CerTest.pfx` to Import your keys to host system

- Click `Next`
- Click `Next`
![Alt text|center|300x300](images/1515739881529.png)

- Select **Mark this key as exportable. This will allow you to back up or transport your keys at a later time.** Also select **Include all extended properties.**
Afterwards, click `Next`
![Alt text|center|300x300](images/1515739927885.png)

- Select **Place all certificates in the following store** and choose **Personal**
after clicking **Browse...** button.
After these are set, click `Next`
![Alt text|center|300x300](images/1516002522134.png)

- Click `Finish` to complete the certificate file installation

![Alt text|center|300x300](images/1516002599200.png)

## 2. Convert you certificates and private key format

- Convert your certificates from **CER** to **CRT** format:

 ```bash
 openssl x509 -inform DER -in CerTest.cer -out CerTest.crt
 ```

- Take private from your **PFX** file:

 ```bash
 openssl pkcs12 -in CerTest.pfx -nocerts -nodes -out CerTest.key
 ```

- Edit `CerTest.key` file to remove the header line.
You just need to keep the key file content
from `-----BEGIN PRIVATE KEY-----`
to `-----END PRIVATE KEY-----`

> Remove:

```bash
Bag Attributes
    localKeyID: 01 00 00 00  
    Microsoft CSP Name: Microsoft Strong Cryptographic Provider
    friendlyName: PvkTmp:dd1a2fd6-59d3-465f-9809-752ae345835b
Key Attributes
    X509v3 Key Usage: 80
```

> Keep:

```bash
-----BEGIN PRIVATE KEY-----
MIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQDAOZ3QYr3pY3X/
...
KHsCphhMFcbptEDRcAcf6YvLJiE=
-----END PRIVATE KEY-----
```
