FROM pubsweet/pubsweet:base

# Install chrome and firefox
RUN curl -sL http://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get install -y google-chrome-stable
# Apparently no debian package for firefox 57
RUN apt-get install -y libdbus-glib-1-2
RUN cd /opt && wget https://ftp.mozilla.org/pub/firefox/releases/64.0/linux-x86_64/en-GB/firefox-64.0.tar.bz2 && \
    tar xjf firefox-*.tar.bz2 && \
    ln -s /opt/firefox/firefox /usr/local/bin/

COPY package.json yarn.lock ./

RUN [ "yarn", "install", "--frozen-lockfile" ]
# Remove cache and offline mirror
RUN [ "yarn", "cache", "clean"]
RUN [ "rm", "-rf", "/npm-packages-offline-cache"]

COPY .eslintignore .eslintrc .prettierrc ./
COPY app.js app.js
COPY static static
COPY scripts scripts
COPY config config
COPY app app
COPY test test
COPY webpack webpack

ENV NODE_ENV "production"

RUN [ "npx", "pubsweet", "build"]

EXPOSE 3000

CMD []
