/*
 * Script pour générer les icônes à partir du favicon.svg
 * À utiliser avec sharp et inkscape pour convertir le SVG en PNG
 * 
 * Commandes à exécuter manuellement:
 * 1. Installer inkscape (https://inkscape.org/)
 * 2. npm install sharp
 * 3. node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Ce script est un exemple de génération d\'icônes.');
console.log('Pour générer les icônes, vous devez:');
console.log('1. Installer Inkscape: https://inkscape.org/');
console.log('2. Exécuter: npm install sharp');
console.log('3. Adapter le script à votre environnement.');
console.log('');
console.log('Commandes pour générer les icônes avec Inkscape:');
console.log('inkscape -w 192 -h 192 public/favicon.svg -o public/icon-192.png');
console.log('inkscape -w 512 -h 512 public/favicon.svg -o public/icon-512.png');
console.log('');
console.log('Pour convertir svg en ico avec ImageMagick:');
console.log('magick convert public/favicon.svg public/favicon.ico');
console.log('');
console.log('Note: Assurez-vous que les outils sont installés et dans votre PATH.'); 