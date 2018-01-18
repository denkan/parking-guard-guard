
sudo apt-get update -y
sudo apt-get dist-upgrade -y

wget github.com/Motion-Project/motion/releases/download/release-4.0.1/pi_jessie_motion_4.0.1-1_armhf.deb 

sudo apt-get install gdebi-core -y
sudo gdebi pi_jessie_motion_4.0.1-1_armhf.deb

#
# Don't forget:
# - Add auto start to /etc/rc.local: 
#   motion -c /home/pi/apps/parking-guard-guard/client/raspi/motion.conf
#
