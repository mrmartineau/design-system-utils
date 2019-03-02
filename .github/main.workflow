workflow "Release" {
  on = "release"
  resolves = ["Publish to npm"]
}

action "Publish to npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
}

workflow "Push" {
  on = "push"
  resolves = ["size"]
}

action "test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "test"
}

action "lint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "lint"
  needs = ["test"]
}

action "size" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["lint"]
  runs = "size"
}
