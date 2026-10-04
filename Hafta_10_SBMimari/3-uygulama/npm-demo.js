/**
 * Hafta 10 — Takım Ş.B. Mimari
 * Modül: Understanding Client-Side Tools Demo
 * Yazar: Mert Özsoy (Rol 1: Canlı Uygulama & Kod)
 * Açıklama: npm ekosistemi ve paket bağımlılıklarının CLI üzerinden doğrulanması.
 */

const chalk = require('chalk');

console.log(chalk.bold.blue('--- Ş.B. Mimari Tooling Laboratuvarı ---'));
console.log(chalk.green('✓ Bu paket npm ile kuruldu! (Chalk v4 CommonJS)'));
console.log(chalk.yellow('⚠ Bağımlılık Ağacı: package.json -> node_modules/chalk'));
console.log(chalk.red('✗ Bu satır konsolda kırmızı görünecek.'));