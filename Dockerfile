FROM node:18-slim

RUN apt-get update && apt-get install -y \
    curl \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*

RUN curl -L https://github.com/clojure/brew-install/releases/latest/download/linux-install.sh | bash

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY deps.edn ./

RUN clojure -P

COPY . .

CMD ["npm", "run", "build"]
