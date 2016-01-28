FROM ubuntu:14.04
WORKDIR $HOME
ENV NVM_DIR /usr/local/nvm
RUN apt-get install curl -y
RUN touch .bashrc
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash

# Each RUN in a Dockerfile is executed in a different container.
# So if you source a file in a container,
# its content will not be available in the next one.
# That is why when you install an application and you need to do several steps,
# you must do it in the same container.
# http://stackoverflow.com/a/25900207

RUN cat $NVM_DIR/nvm.sh >> installnode.sh
RUN echo "nvm install 4" >> installnode.sh
RUN echo "nvm alias default 4" >> installnode.sh
RUN sh installnode.sh
CMD '/bin/bash'
