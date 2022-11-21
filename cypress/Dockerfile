FROM cypress/included:9.7.0

WORKDIR /app

COPY . .
COPY ./cypress.json .

RUN npx cypress run