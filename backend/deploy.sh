docker build . -t projectbackend 
docker save projectbackend > projectbackend.tar
scp -i ~/.ssh/testing.pem -r projectbackend.tar ubuntu@testing:/home/ubuntu
scp -i ~/.ssh/testing.pem -r Dockerfile ubuntu@testing:/home/ubuntu 
scp -i ~/.ssh/testing.pem -r docker-compose.yml ubuntu@testing:/home/ubuntu 
ssh -i ~/.ssh/testing.pem ubuntu@testing -t 'sudo docker load --input ./projectbackend.tar'
ssh -i ~/.ssh/testing.pem ubuntu@testing -t 'sudo docker-compose up'