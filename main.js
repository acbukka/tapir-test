'use strict'

const linkItems = document.querySelectorAll('.tapir-item');

linkItems.forEach((link) => {
  link.addEventListener('click', () => {
    linkItems.forEach((linkItem) => {
      linkItem.classList.remove('active');
    })
    link.classList.add('active');
    console.log('bam');
  })
})