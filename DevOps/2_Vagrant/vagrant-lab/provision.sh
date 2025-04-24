#!/usr/bin/env bash
echo "Installing Apache and setting it up..."

# Instala o Apache e verifica se deu certo
yum install -y httpd
if [ $? -eq 0 ]; then
    echo "Apache instalado com sucesso."
    cp -r /vagrant/html/* /var/www/html/
    systemctl start httpd
    systemctl enable httpd
else
    echo "Erro ao instalar o Apache."
fi
