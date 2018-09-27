# backend dir

### branch architecture
- master
	- development
		- local : feature
		- develop-server
		- release-server

* feature branch
```
$ git checkout -b myfeature(feat_[issue-number]) development

$ git commit -m "close #1 - make some function" 이슈 닫아줌

$ git checkout devleop-server
$ git merge -no-ff myfeature 필히 머지커밋 만들어줌
$ git branch -d myfeature
4 git push origin develop-server

```

* release_server branch
```
$ git checkout -b release-[version-number] develop_server

package.json에 버전 변경
$ npm version [version-number]
$ git tag [version_number]
$ git commit -m "Bumped version number to [version-number]"
$ git push origin release-[version-number]

commit

$ git checkout development
$ git merge -no-ff release-[version-number]
$ git push origin devlopment

tagging

$ git tag -a [version-number]
$ git push origin [version-number]

$ git checkout develop-server
$ git merge -no-ff release-[version-number]
$ git push origin develop-server

delete

$ git branch -d release-[version-number]
```

> https://nvie.com/posts/a-successful-git-branching-model/


