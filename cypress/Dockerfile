FROM python:3
WORKDIR /fakelpb
COPY ./public/data .
CMD [ "python", "-m http.server 8080" ]

FROM cypress/included:3.4.0
WORKDIR /e2e
COPY ./cypress ./cypress
COPY ./cypress.json .
COPY ./package.json .
RUN npm i
RUN npx cypress run --config baseUrl=http://host.docker.internal:3001