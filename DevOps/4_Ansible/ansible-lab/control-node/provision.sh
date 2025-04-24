#!/bin/bash

# Instalação do repositório EPEL e Ansible
sudo yum -y install epel-release
echo "Iniciando instalação do Ansible..."
sudo yum -y install ansible

# Configurações de rede simulada no /etc/hosts
cat <<EOT | sudo tee -a /etc/hosts
192.168.56.10 control-node
192.168.56.11 app01
192.168.56.12 db01
EOT
