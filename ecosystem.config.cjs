module.exports = {
  apps: [{
    name: 'artys-for-artists',
    script: 'npx',
    args: 'vite --host 0.0.0.0 --port 3000',
    watch: false,
    instances: 1,
    exec_mode: 'fork'
  }]
}
