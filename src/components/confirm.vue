<template>
    <section>
      <md-dialog-confirm
  :md-title="confirm.title"
  :md-content-html="confirm.contentHtml"
  :md-ok-text="confirm.ok"
  :md-cancel-text="confirm.cancel"
  @open="onOpen"
  @close="onClose"
  ref="dialog5">
</md-dialog-confirm>

<md-button class="md-primary md-raised" @click="openDialog('dialog5')">Confirm</md-button> 
    </section>       
</template>

<script>
export default {
    name: 'confirm',
  data: () => ({
    confirm: {
      title: 'Use Google\'s location service?',
      contentHtml: 'Let Google help apps determine location. <br> This means sending <strong>anonymous</strong> location data to Google, even when no apps are running.',
      ok: 'Agree',
      cancel: 'Disagree'
    }
  }),
  methods: {
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    }
  }
};

</script>

<style>

</style>