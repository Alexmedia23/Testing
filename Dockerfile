FROM quay.io/teamolduser/docker

COPY . /root/JOSHBOT
WORKDIR /root/JOSHBOT
RUN apt install ffmpeg
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["yarn", "start"]