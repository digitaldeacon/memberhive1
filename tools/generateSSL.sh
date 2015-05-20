rm ../private/privatekey.pem
rm ../private/certificate.pem
rm ../private/certificate.csr
openssl req -nodes -newkey rsa:2048 -sha256 -keyout '../private/privatekey.pem' -out '../private/certificate.csr' -subj '/CN=localhost/C=DE'
openssl x509 -req -days 3650 -in ../private/certificate.csr -signkey ../private/privatekey.pem -out ../private/certificate.pem
