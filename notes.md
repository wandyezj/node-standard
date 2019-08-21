# Notes

## build

> npm run build

## publish

1. > npm version `patch`
    * update the {patch, major, minor} version of the package

1. > npm login

1. > npm publish -access=public

    * `-access=public` is requires to publish the package under the scope

1. > npm logout

1. > git tag `version`
    * `version` the version of the package
1. > git push

## unpublish

> npm login

> npm unpublish --force `package name` --otp=`one time pass`

* `package name` is the name of the package to unpublish
* `one time pass` authentication code from the authenticator app

> npm logout

## deprecate

> npm deprecate @wandyezj/standard-node@"< `0.0.2`" "please update to the latest version" --otp=`one time pass`

* deprecate older versions upon every publish
