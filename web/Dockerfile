# Copyright 2015 Scott Lee Davis <me@scottleedavis.com>
l
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM ubuntu:14.04
MAINTAINER Scott Lee Davis <me@scottleedavis.com>

RUN apt-get update && apt-get -y -q install nodejs npm icedtea-7-plugin openjdk-7-jre openjdk-7-jdk maven && apt-get install -y curl git sudo 

# Ensure UTF-8 locale
RUN locale-gen en_US.UTF-8
ENV LANG       en_US.UTF-8
ENV LC_ALL     en_US.UTF-8
RUN dpkg-reconfigure locales

# Install build dependencies
RUN apt-get update -qq && \
    apt-get install -y -qq \
      build-essential \
      ca-certificates \
      curl \
      libcurl4-openssl-dev \
      libffi-dev \
      libgdbm-dev \
      libpq-dev \
      libreadline6-dev \
      libssl-dev \
      libtool \
      libxml2-dev \
      libxslt-dev \
      libyaml-dev \
      postgresql-client-9.3 \
      software-properties-common \
      wget \
      zlib1g-dev

ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64
ENV PATH $PATH:$JAVA_HOME/bin


# ==============================================================================
# Ruby with postgres support
# ==============================================================================

# Set $PATH so that non-login shells will see the Ruby binaries
ENV PATH $PATH:/opt/rubies/ruby-2.1.2/bin

# Add PostgreSQL Global Development Group apt source
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" \
    > /etc/apt/sources.list.d/pgdg.list

# Add PGDG repository key
RUN wget -qO - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc \
    | apt-key add -

# Install MRI Ruby 2.1.2
RUN curl -O http://ftp.ruby-lang.org/pub/ruby/2.1/ruby-2.1.2.tar.gz && \
    tar -zxvf ruby-2.1.2.tar.gz && \
    cd ruby-2.1.2 && \
    ./configure --disable-install-doc && \
    make && \
    make install && \
    cd .. && \
    rm -r ruby-2.1.2 ruby-2.1.2.tar.gz && \
    echo 'gem: --no-document' > /usr/local/etc/gemrc

# ==============================================================================
# Rubygems, Bundler and Foreman
# ==============================================================================

# Install rubygems and bundler
ADD http://production.cf.rubygems.org/rubygems/rubygems-2.3.0.tgz /tmp/
RUN cd /tmp && \
    tar -zxf /tmp/rubygems-2.3.0.tgz && \
    cd /tmp/rubygems-2.3.0 && \
    ruby setup.rb && \
    /bin/bash -l -c 'gem install bundler --no-rdoc --no-ri' && \
    echo "gem: --no-ri --no-rdoc" > ~/.gemrc

# Clean up APT and temporary files when done
RUN apt-get clean -qq && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Define working directory
WORKDIR /usr/local/bin/nia/

EXPOSE  9999


# Set bash as a default process
CMD ["bash"]

RUN gem install license_finder
CMD npm install -g not-impressed


ADD package.json /usr/local/bin/nia/package.json
ADD server.js /usr/local/bin/nia/server.js
ADD api-start.sh /usr/local/bin/nia/api-start.sh
RUN chmod +x /usr/local/bin/nia/api-start.sh
RUN cd /usr/local/bin/nia/ && npm install



ENTRYPOINT ["/usr/local/bin/nia/api-start.sh"]
