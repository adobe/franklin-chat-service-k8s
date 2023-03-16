module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', {
      'changelogFile': 'CHANGELOG.md',
    }],
    ["@semantic-release/npm", {
      npmPublish: false,
    }],
    ['@semantic-release/exec', {
      prepareCmd: 'npm run build:release',
    }],
    ['@semantic-release/git', {
      'assets': ['package.json', 'package-lock.json', 'CHANGELOG.md', 'dist/**/*.*'],
      'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],
    ['@semantic-release/github', {}],
  ],
  branches: ['main'],
};