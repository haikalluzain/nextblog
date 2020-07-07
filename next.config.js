const path = require('path')

const nextConfig = {
  env: {
    MONGODB_LOCAL_URL: 'mongodb://localhost/blog-app',
    MONGODB_PRODUCTION_URL: 'mongodb+srv://normal-user:normal123@new-normal.wjofi.gcp.mongodb.net/blog-app?retryWrites=true&w=majority',
    MEDIA_PATH: '/media',
    UPLOAD_DIR: path.resolve('public', 'media')
  }
}

module.exports = nextConfig