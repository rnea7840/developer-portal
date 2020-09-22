## Overview
This pipeline will utilize a Makefile from the root directory to invoke the testing options. It intends to give the developer the opputunity to run the CI process locally inorder to get instant feedback on their work.

## Makefile
To run tests simply type `make <test>` where <test> is the type of test you would like to run, for example __lint__. Run `make` to get an output of targets you can run.
__Note:__ The tests are run in a container. This container currently runs as the user __jenkins__ which you most likely do not have on your machine. The tests that are run are also the same test that run in __CI__ , resulting in the tests outputting a report file. This report file most likely will have trouble writing to your local machine as the __jenkins__ user. Therefore, you can export a variable to set the user the container will run as. This user in most all cases will be __root__. To do this you merely have to run `export UNAME=root`. You can also do the same for the group; `export GNAME=root`.


## CI 

## Release

## Deploy
