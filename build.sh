export BUNDLE_PATH=.vendor
bundle install --path .vendor/bundle

GEM_PATH=${GEM_PATH}:.vendor bundle exec jekyll build
#GEM_PATH=${GEM_PATH}:.vendor ./.vendor/bundle/ruby/2.5.0/bin/htmlproofer --help
#GEM_PATH=${GEM_PATH}:.vendor ./.vendor/bundle/ruby/2.5.0/bin/htmlproofer ./_site --allow-hash-href --check-favicon --check-html --disable-external
GEM_PATH=${GEM_PATH}:.vendor bundle exec jekyll $*
