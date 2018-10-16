# Installing Docker CE
if [ ! -f /usr/bin/docker ]; then
    echo 'Installing Docker CE'
    # Install Docker CE from the Debian-based distributions repository
    sudo apt-get install -y docker-ce

else
    echo "Docker CE already installed.  Skipping..."
fi

# Installing Docker Compose
if [ ! -f /usr/bin/docker-compose ]; then
    echo 'Installing Docker Compose'
    # Install Docker Compose from the Debian-based distributions repository
    sudo apt-get install -y docker-compose

else
    echo "Docker Compose already installed.  Skipping..."
fi

# Installing npm to testcase
if [ ! -f /usr/bin/npm ]; then
    echo 'Installing npm'
    # Install npm from the Debian-based distributions repository
    sudo apt-get install -y npm

else
    echo "npm already installed.  Skipping..."
fi

# # Start the application
sudo npm install 
sudo docker-compose up &
sleep 5
## Start Test Cases
echo 'Starting Test Suite'
npm test app/test
