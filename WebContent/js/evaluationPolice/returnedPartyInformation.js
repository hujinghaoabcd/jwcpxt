$(function() {
	let myData = {
		returnedParty : {
			serviceInstance : {
				service_client_name : '',
				service_instance_date : ''
			},
			serviceClient : {
				service_client_sex : '',
				service_client_phone : ''
			},
			serviceDefinition : {
				service_definition_describe : ''
			},
			unit : {
				unit_name : ''
			}
		},
		type : getUrlParam("type")
	};

	let vm = new Vue({
		el : "#content",
		data : myData,
		methods : {
			getInfo () {
				$.post('/jwcpxt/Service/get_notServiceClient_byServiceClientId', {
					type : myData.type
				}, response => {
					this.returnedParty = response;
				}, 'json')
			},
			beginReturned () {
				//console.log(`/jwcpxt/Skip/skipPoliceAssessmentPage?type=${myData.type}&definitionId=${this.returnedParty.serviceDefinition.jwcpxt_service_definition_id}&serviceClientId=${this.returnedParty.serviceClient.jwcpxt_service_client_id}`);
				window.location.href = `/jwcpxt/Skip/skipPoliceAssessmentPage?type=${myData.type}&definitionId=${this.returnedParty.serviceDefinition.jwcpxt_service_definition_id}&serviceClientId=${this.returnedParty.serviceClient.jwcpxt_service_client_id}`;
			}
		},
		mounted () {
			this.getInfo();
		},
	})

	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
})