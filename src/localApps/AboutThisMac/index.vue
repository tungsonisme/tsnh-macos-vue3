<script lang="ts" setup>
const macosVersion = import.meta.env.VITE_MACOS_VERSION;
const kernelVersion = import.meta.env.VITE_KERNEL_VERSION;
const vueVersion = import.meta.env.VITE_VUE_VERSION;
const piniaVersion = import.meta.env.VITE_PINIA_VERSION;
const viteVersion = import.meta.env.VITE_VITE_VERSION;
</script>

<template>
  <div class="about-this-mac">
    <div class="about-this-mac-info">
      <div class="profile-picture-wrapper">
        <img
          class="profile-picture"
          src="../../assets/images/profilePicture.jpg"
        />
      </div>
      <div class="info-wrapper">
        <div class="os"><b>macOS</b> TSNH</div>
        <div class="version">Version {{ macosVersion }}</div>
        <div class="info-line"><b>Sean Nguyen (Creator)</b></div>
        <div class="info-line">
          <b class="title">Kernel</b>
          tsnh-macos-kernel@{{ kernelVersion }}
        </div>
        <div class="info-line">
          <b class="title">Framework</b>
          vue@{{ vueVersion }}
        </div>
        <div class="info-line">
          <b class="title">Store</b>
          pinia@{{ piniaVersion }}
        </div>
        <div class="info-line">
          <b class="title">Tooling</b>
          vite@{{ viteVersion }}
        </div>
      </div>
    </div>

    <div class="copyright">2023 TSNH. All Rights Reserved.</div>
  </div>
</template>

<style lang="scss" scoped>
.about-this-mac {
  background: rgba(244, 245, 245, 0.95);
  width: 100%;
  height: 100%;
  color: $black;

  .about-this-mac-info {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;

    * {
      font-size: 13px;
    }

    .profile-picture-wrapper {
      width: 280px;
      text-align: center;
    }

    .profile-picture {
      border-radius: 50%;
      width: 140px;
      height: 140px;
      border: 5px solid white;
      filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.15))
        drop-shadow(0 12px 15px rgba(0, 0, 0, 0.35));
    }

    .info-wrapper {
      flex: 1;
    }

    .info-line {
      margin-bottom: 4px;
    }

    .os,
    .os * {
      font-size: 28px;
    }

    .version {
      margin-bottom: 24px;
    }

    .title {
      margin-right: 4px;
    }
  }

  .copyright {
    text-align: center;
    color: rgb(178, 178, 178);
    font-size: 11px;
  }
}
</style>
