<template>
  <button @click="saveHandler" type="button" class="btn-sm btn-sm--icon-left btn--dark">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10V16.4C3 16.8243 3.18437 17.2313 3.51256 17.5314C3.84075 17.8314 4.28587 18 4.75 18H15.25C15.7141 18 16.1592 17.8314 16.4874 17.5314C16.8156 17.2313 17 16.8243 17 16.4V10M14 6L10 2M10 2L6 6M10 2V12" stroke="white" stroke-width="1.5"/>
    </svg>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'AppSaveConfigButton',
  data: () => ({
    text: 'Сохранить конфигурацию'
  }),
  methods: {
    copyUrl() {
        const el = document.createElement('textarea');  
        el.value = window.location.href;                                 
        el.setAttribute('readonly', '');                
        el.style.position = 'absolute';                     
        el.style.left = '-9999px';                      
        document.body.appendChild(el);                  
        const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;                                    
        el.select();                                    
        document.execCommand('copy');                   
        document.body.removeChild(el);                  
        if (selected) {                                 
          document.getSelection().removeAllRanges();    
          document.getSelection().addRange(selected);
        }
    },
    saveHandler() {
      this.copyUrl()
      this.text = 'Ссылка скопирована'
      setTimeout(() => {
          this.text = 'Сохранить конфигурацию'
      }, 2500);
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-sm {
    min-width: 216px;
  }
</style>