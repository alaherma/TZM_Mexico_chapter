#!/bin/bash

echo WATCH
date

if OUTPUT=$(rsync -va --info=NAME -ur /git/chapter.site.template/* .)
then
    if [ "$OUTPUT" != "" ]                   # got output?
    then
		echo OUTPUT $OUTPUT

		ps aux | grep jekyll
		killall bundle
		GEM_PATH=${GEM_PATH}:.vendor/bundle/ruby/2.5.0 bundle exec jekyll build -d /opt/sites/test
		
		buildexit=$?
		
		echo exit code "${buildexit}"
		if [ "0" == "${buildexit}" ]; then
			echo OK?
			if [ -f error.log ]; then rm error.log; fi
			sleep 1
		else 
			echo FAIL?
			rm error.log
			cat *.log > error.log
			sleep 1
		fi
	else
		if [ -f error.log ]; then cat error.log; fi
    fi
fi


 erve