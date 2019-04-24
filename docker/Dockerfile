FROM ubuntu:17.10

RUN apt-get update && apt-get install -y curl build-essential git

RUN curl -sL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get install -y nodejs firefox google-chrome-stable && \
    mkdir /tests && \
    npm i -g yarn

ENTRYPOINT bash
WORKDIR /tests