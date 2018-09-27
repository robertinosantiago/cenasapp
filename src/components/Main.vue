<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Votação Cenas da Cidade">
    </ActionBar>

    <StackLayout class="stack">
      <Image class="logo" src="~/images/logo.png"/>

      <Label text="Identificação" />
      <TextField :editable="!enviando" v-model="voto.identificacao" hint="Identificação do votante" />

      <Label text="Foto escolhida" />
      <TextField :editable="!enviando" v-model="voto.foto" hint="Número da foto" keyboardType="number" />

      <ActivityIndicator :busy="enviando" />

      <Button text="Votar" @tap="votar" :isEnabled="!enviando" />
    </StackLayout>

  </Page>
</template>

<script>
const axios = require('axios');
import {device} from 'tns-core-modules/platform'

export default {
  data() {
    return {
      enviando: false,
      voto: {
        identificacao: null,
        foto: null,
      }
    }
  },
  methods: {
    limparCampos: function() {
      this.voto.identificacao = null;
      this.voto.foto = null;
    },
    validaCampos: function() {
      if (this.voto.identificacao == null) {
        alert('Idenfique o votante');
        return false;
      }
      if (this.voto.foto == null) {
        alert('Informe a foto selecionada');
        return false;
      }

      if (this.voto.foto < 1 || this.voto.foto > 15) {
        alert('Número da foto inválido');
        return false;
      }

      return true;
    },
    votar: function() {
      if (this.validaCampos()) {
        this.enviando = true;
        let deviceId = device.uuid;
        let app = this;
        axios.post('http://www.valedaciencia.ufpr.br/cenasdacidade/votacao.php', {
          token: deviceId,
          identificacao: app.voto.identificacao,
          foto: app.voto.foto
        })
        .then(function(response){
            alert('Voto registrado');
            app.limparCampos();
            app.enviando = false;
        })
        .catch(function(error){
          console.log(error);
          alert('Erro' + error);
          app.limparCampos();
          app.enviando = false;
        });

      }
    }
  }

}
</script>

<style lang="css">
  .logo {
    margin-top: 10px;
    max-width: 100%;
    height: auto;
  }
  .stack {
    padding: 30px;
    background-color: #ccc;
    margin:0;
  }
</style>
