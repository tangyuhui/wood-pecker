<template>
    <div  class="init-loading" id="init-loading">
    <div class="loading-center">
        <div class="loading-ring">
            <div class="loading-ball-holder">
                <div class="loading-ball1"></div>
                <div class="loading-ball2"></div>
                <div class="loading-ball3"></div>
                <div class="loading-ball4"></div>
            </div>
        </div>
        <p></p>
    </div>
</div>
</template>
<script>
export default {
  name: '',
  mixins: [],
  components: {

  },
  props: {
  },

  data() {
    return {
    };
  },

  computed: { },

  watch: {},

  created() {
  },

  mounted() {},

  destroyed() {},

  methods: {

  }
};
</script>

<style scoped>

.init-loading {
	position: absolute;
	top: 40%;
	right: 0;
	left: 0;
	width: 100px;
	height: 100px;
	margin: 0 auto;
	line-height: 100px;
	background: #fff;
	box-shadow: 0 0 10px 0 #e3e3e4;
	border-radius: 4px;
	z-index: 9999
}

.loading-center {
	display: inline-block;
	width: 100%;
	vertical-align: middle
}

.init-loading p {
	display: none;
	width: 100%;
	margin: 0 auto;
	margin-top: 15px;
	font-size: 13px;
	color: #a3a4a6;
	text-align: center;
	line-height: 20px;
	font-family: PingFangSC-Regular
}

.loading-ring {
	position: relative;
	width: 23px;
	height: 23px;
	margin: 0 auto;
	border: 2px solid #9c27b0;
	border-radius: 100%;
	border: hidden
}

.loading-ball-holder {
	position: absolute;
	width: 6px;
	height: 24px;
	left: 9px;
	top: 0;
	animation: loading-ball 1.3s linear infinite;
	-webkit-animation: loading-ball 1.3s linear infinite
}

.loading-ball1 {
	background: #f25643
}

.loading-ball1,.loading-ball2 {
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 100%
}

.loading-ball2 {
	bottom: 0;
	background: #15bc83
}

.loading-ball3 {
	left: -9px;
	background: #3296fa
}

.loading-ball3,.loading-ball4 {
	position: absolute;
	top: 9px;
	width: 6px;
	height: 6px;
	border-radius: 100%
}

.loading-ball4 {
	right: -9px;
	background: #ff943e
}

@-webkit-keyframes loading-ball {
	0% {
		transform: rotate(0deg)
	}

	30% {
		transform: rotate(190deg)
	}

	to {
		transform: rotate(1turn)
	}
}
@keyframes loading-ball {
	0% {
		transform: rotate(0deg)
	}

	30% {
		transform: rotate(190deg)
	}

	to {
		transform: rotate(1turn)
	}
}
</style>
