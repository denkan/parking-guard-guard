
sudo apt-get update -y
sudo apt-get dist-upgrade -y

wget github.com/Motion-Project/motion/releases/download/release-4.0.1/pi_jessie_motion_4.0.1-1_armhf.deb 

sudo apt-get install gdebi-core -y
sudo gdebi pi_jessie_motion_4.0.1-1_armhf.deb -y

