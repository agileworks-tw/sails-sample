FROM agileworks/sails_sample_env
COPY ./ /sailsSample
WORKDIR /sailsSample

ENV PORT "1337"
ENV DOMAIN_HOST "localhost:1337"

EXPOSE 1337
CMD /bin/sh -l -c 'npm start --production'
