# 


## Installation


### generation ssh-keygen

1. generate private key in PKCS#1 format
```shell
openssl genrsa -f4 -out private.txt 4096 
```
2. export public key
```shell
openssl rsa -in private.txt -outform PEM -pubout -out public.pem
```
3. export private key to PKCS#8 format
```shell
openssl pkcs8 -topk8 -inform pem -in private.txt -outform PEM -nocrypt -out private.pem
```
