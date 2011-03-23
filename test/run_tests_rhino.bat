@ECHO off
set RHINO_HOME="c:/java/rhino"
java -cp %RHINO_HOME%/js.jar org.mozilla.javascript.tools.shell.Main rhino_test_runner.js