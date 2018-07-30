$(function() {
	let myData = {
		definitionId : getUrlParam('definitionId'), //业务定义ID
		serviceClientId : getUrlParam('serviceClientId'), //业务当事人ID
		type : getUrlParam('type'), //业务当事人ID
		todayCount : 0,
		todaySuccessCount : 0,
		serviceClien : {},
		serviceDefinition : {},
		questionData : [],
		returnedParty : { //数据只作为初始化用
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
			}
		}
	};
	let listAnswerDTO = [];
	let listAnswerInquiriesDTO = [];
	let vm = new Vue({
		el : "#content",
		data : myData,
		methods : {
			getInfo () {
				//获取业务定义
				$.post('/jwcpxt/Service/get_serviceDefinitionDo_byId', {
					"serviceDefinition.jwcpxt_service_definition_id" : myData.definitionId
				}, response => {
					myData.serviceDefinition = response;
				}, 'json')
				//获取session中的回访信息
				$.post('/jwcpxt/Service/get_notServiceClient_byServiceClientId', {
					type : myData.type
				}, response => {
					this.returnedParty = response;
				}, 'json')
				//获取当事人ID
				$.post('/jwcpxt/Service/get_serviceClientDo_byId', {
					"serviceClient.jwcpxt_service_client_id" : myData.serviceClientId
				}, response => {
					myData.serviceClien = response;
				}, 'json')
				//获取所有问题
				$.post('/jwcpxt/Question/list_questionDTO_byServiceDefinition', {
					"serviceDefinition.jwcpxt_service_definition_id" : myData.definitionId
				}, response => {
					myData.questionData = response;
				}, 'json')
				//获取测评员当日成功回访个数
				let nowData = getFormatDate();
				//今天总数
				$.post('/jwcpxt/Service/get_countFinishReturnVisit_inDate', {
					"countFinishReturnVisitVo.beginTime" : nowData,
					"countFinishReturnVisitVo.appraisalId" : myData.serviceClientId,
					"countFinishReturnVisitVo.countType" : 'scope',
					"countFinishReturnVisitVo.type" : '-1'
				}, response => {
					myData.todayCount = response;
				}, 'json')
				//今天成功总数
				$.post('/jwcpxt/Service/get_countFinishReturnVisit_inDate', {
					"countFinishReturnVisitVo.beginTime" : nowData,
					"countFinishReturnVisitVo.appraisalId" : myData.serviceClientId,
					"countFinishReturnVisitVo.countType" : 'scope',
					"countFinishReturnVisitVo.type" : '1'
				}, response => {
					myData.todaySuccessCount = response;
				}, 'json')
			},
			checkOption ($event, index) {
				let opyionIndex = $event.target.attributes.optionIndex.value;
				let answer = {
					"question.jwcpxt_question_id" : myData.questionData[index].question.jwcpxt_question_id, //所属问题id
					"option.jwcpxt_option_id" : $event.target.attributes.optionid.value, //所属选项id
				}
				listAnswerDTO[index] = answer;

				let allOption = myData.questionData[index].listOptionDTO;
				allOption.forEach(function(item, i) {
					//console.log($('input[type="radio"][optionID="' + allOption[i].option.jwcpxt_option_id + '"]'));
					$('input[type="radio"][optionID="' + allOption[i].option.jwcpxt_option_id + '"]').parent().siblings('.inquiriesContent').html('');
				})

				/*for (let item in allOption) {
					console.log(allOption[item.jwcpxt_option_id]);
					console.log($('input[type="radio"][optionID="' + allOption[item.jwcpxt_option_id] + '"]'));
					$('input[type="radio"][optionID="' + allOption[item.jwcpxt_option_id] + '"]').parent().siblings('.inquiriesContent').html();
				}*/

				if (myData.questionData[index].listOptionDTO[opyionIndex].listInquiriesOptionDTO.length > 0) {
					//问题的index索引
					//inquiriesOptionDTO 所选的选项的全部追问
					//optionID   所选的选项的ID
					answerInquiries(index, myData.questionData[index].listOptionDTO[opyionIndex].listInquiriesOptionDTO, answer["option.jwcpxt_option_id"]);
				}
			},
			inputTextarea ($event, index) {
				let answer = {
					"question.jwcpxt_question_id" : myData.questionData[index].question.jwcpxt_question_id, //所属问题id
					//"serviceClient.jwcpxt_service_client_id" : myData.serviceClientId, //当事人id
					"answerOpen.answer_open_content" : $event.target.value //开放题回答的内容
				}
				listAnswerDTO[index] = answer;
			},
			finishReturned ($event) {
				let falg = false;
				if (listAnswerDTO.length > 0) {
					let length = this.questionData.length;
					for (var int = 0; int < length; int++) {
						if (!listAnswerDTO[int]) {
							toastr.error('第' + (int + 1) + '条问题没有进行回访，请查看!');
							return;
						}
					}
					falg = true;
				} else {
					toastr.error('还未开始回访，请进行回访!');
				}
				if (falg)
					$.confirm({
						title : "确定结束?",
						icon : 'fa fa-warning',
						type : "red",
						autoClose : 'close|10000',
						smoothContent : false,
						content : false,
						buttons : {
							tryAgain : {
								text : '确认',
								btnClass : 'btn-red',
								action : function() {
									/* 数据格式转换,方便存入到后台的DTO中*/
									let params = {
										"serviceClient.jwcpxt_service_client_id" : myData.serviceClientId
									};
									//记录数据的索引
									let index;
									listAnswerDTO.forEach(function(elt, i) {
										for (let item in elt) {
											params['listAnswerDTO[' + i + '].' + item] = elt[item];
										}
										index = i + 1;
									})

									listAnswerInquiriesDTO.forEach(function(arr, i) {
										arr.forEach(function(elt, j) {
											for (let item in elt) {
												params['listAnswerDTO[' + index + '].' + item] = elt[item];
											}
											index += 1;
										})
										index += 1;
									})
									//
									$.post('/jwcpxt/Question/save_answer', params, response => {
										if (response == "1") {
											$($event.target).attr("disabled", "disabled");
											toastr.success("回访结束");
											setTimeout(function() {
												if (myData.definitionId == "revisit") {
													window.location.href = "/jwcpxt/Skip/skipReturnedRectificationInformation";
												} else
													window.location.href = "/jwcpxt/Skip/skipReturnedPartyInformation";
											}, 0);
										} else if (response == "-1") {
											toastr.error("结束失败");
										}
									}, 'text');
								}
							},
							close : {
								text : '取消',
								btnClass : 'btn-default',
								keys : [ 'esc' ],
								action : function() {}
							}
						}
					});
			},
			terminationReturned (event) {
				$.confirm({
					title : "确定终止?",
					icon : 'fa fa-warning',
					type : "red",
					autoClose : 'close|10000',
					smoothContent : false,
					content : false,
					buttons : {
						tryAgain : {
							text : '确认',
							btnClass : 'btn-red',
							action : function() {
								/* 数据格式转换,方便存入到后台的DTO中*/
								let params = {
									"serviceClient.jwcpxt_service_client_id" : myData.serviceClientId,
									"serviceClient.service_client_visit" : $(event.target).attr("terminationNum")
								};
								//
								$.post('/jwcpxt/Service/update_serviceClient_byId', params, response => {
									if (response == "1") {
										$(event.target).attr("disabled", "disabled");
										toastr.success("回访被终止");
										setTimeout(function() {
											if (myData.definitionId == "revisit") {
												window.location.href = "/jwcpxt/Skip/skipReturnedRectificationInformation";
											} else
												window.location.href = "/jwcpxt/Skip/skipReturnedPartyInformation";
										}, 0);
									} else if (response == "-1") {
										toastr.error("回访终止失败");
									}
								}, 'text');
							}
						},
						close : {
							text : '取消',
							btnClass : 'btn-default',
							keys : [ 'esc' ],
							action : function() {}
						}
					}
				});
			}
		},
		mounted () {
			this.getInfo();
			initIcheck();
		},
	});

	//初始化icheck
	function initIcheck() {
		setTimeout(function() {
			$('input').iCheck({
				checkboxClass : 'icheckbox_square-blue',
				radioClass : 'iradio_square-blue',
				increaseArea : '20%' // optional
			});
		}, 200)
		setTimeout(function() {
			$('input').iCheck({
				checkboxClass : 'icheckbox_square-blue',
				radioClass : 'iradio_square-blue',
				increaseArea : '20%' // optional
			});
		}, 300)
		setTimeout(function() {
			$('input').iCheck({
				checkboxClass : 'icheckbox_square-blue',
				radioClass : 'iradio_square-blue',
				increaseArea : '20%' // optional
			});
			$('input').on('ifChecked', function(event) {
				vm.checkOption(event, event.target.name);
			});
		}, 400)
	}

	//inquiriesOptionDTO 所选的选项的全部追问
	//optionID   所选的选项的ID
	//answer 追问的答案
	function answerInquiries(index, inquiriesOptionDTO, optionID) {
		let answerData = [];
		let inquiriesStr = [];
		let answerInquiriesConfirmVue;
		let answerInquiriesConfirm = $.confirm({
			smoothContent : false, //关闭动画
			closeIcon : true, //关闭图标
			closeIconClass : 'fa fa-close', //图标样式
			type : 'dark', //弹出框类型
			typeAnimated : true, //未知。。。。
			boxWidth : '30%', //设置宽度
			useBootstrap : false, //设置是否使用bootstropt样式
			offsetTop : 10, //设置距离浏览器高度
			title : '追问',
			content : `
			<div id="answerInquiries">
			<template v-for="(inquiriesOption,index) in inquiriesOptionData">
				<!-- 选择题 -->
				<template v-if="inquiriesOption.inquiriesQuestion.question_type==4">
					<div class="form-group">
						<label>{{inquiriesOption.inquiriesQuestion.question_sort +'.'+ inquiriesOption.inquiriesQuestion.question_describe}}</label>
						<!-- 选项循环 -->
						<template v-for="(option,index1) in inquiriesOption.listInquiriesOption">
							<div class="form-group">
								<!-- 直接使用name当做索引和单选组会和问题的选项冲突，所以取消用name做索引 -->
								<input type="radio" :name="inquiriesOption.inquiriesQuestion.jwcpxt_question_id" :optionIndex="index1" :index="index" :optionID="option.jwcpxt_option_id">
								<label class="control-label">{{option.option_describe}}</label>
							</div>
						</template>
					</div>
				</template>
				<!-- 主观题 -->
				<template v-else-if="inquiriesOption.inquiriesQuestion.question_type==3">
					<div class="form-group">
						<label>{{inquiriesOption.inquiriesQuestion.question_sort +'.'+ inquiriesOption.inquiriesQuestion.question_describe}}</label>
						<textarea class="form-control" rows="3" @change="inputInquiriesTextarea($event,index)"></textarea>
					</div>
				</template>
			</template>
			</div>
			`,
			onContentReady : function() {
				answerInquiriesConfirmVue = new Vue({
					el : '#answerInquiries',
					data : {
						inquiriesOptionData : inquiriesOptionDTO
					},
					methods : {
						//index为问题的索引
						checkOption ($event, index) {
							let answer = {
								"question.jwcpxt_question_id" : this.inquiriesOptionData[index].inquiriesQuestion.jwcpxt_question_id, //所属问题id
								"option.jwcpxt_option_id" : $event.target.attributes.optionid.value, //所属选项id
							}
							answerData[index] = answer;
							let optionIndex = $event.target.attributes.optionIndex.value;
							inquiriesStr[index] = `<br/><small>${this.inquiriesOptionData[index].listInquiriesOption[optionIndex].option_describe}</small>`;
						},
						inputInquiriesTextarea (event, index) {
							let answer = {
								"question.jwcpxt_question_id" : this.inquiriesOptionData[index].inquiriesQuestion.jwcpxt_question_id, //所属问题id
								"answerOpen.answer_open_content" : $event.target.value //开放题回答的内容
							}
							answerData[index] = answer;
							inquiriesStr[index] = `<br/><small>${answer["answerOpen.answer_open_content"]}</small>`;
						},
					},
					mounted () {
						setTimeout(() => {
							answerInquiriesConfirm.$content.find('input').iCheck({
								checkboxClass : 'icheckbox_square-blue',
								radioClass : 'iradio_square-blue',
								increaseArea : '20%' // optional
							});
							answerInquiriesConfirm.$content.find('input').on('ifChecked', function(event) {
								answerInquiriesConfirmVue.checkOption(event, event.target.attributes.index.value);
							});
						}, 0);
					}
				})
			},
			buttons : {
				add : {
					text : '确认',
					btnClass : 'btn-success',
					action : function() {
						/*let falg = false;
						if (answerData.length > 0) {
							let length = answerData.length;
							for (var int = 0; int < length; int++) {
								if (!answerData[int]) {
									toastr.error('第' + (int + 1) + '条追问没有进行回访，请查看!');
									return false;
								}
							}
							falg = true;
						} else {
							toastr.error('追问还没开始回访，请进行回访!');
						}
						if (falg) {
							listAnswerInquiriesDTO[index] = answerData;
							$('input[type="radio"][optionID="' + optionID + '"]').parent().siblings('.inquiriesContent').html(inquiriesStr);
							toastr.success('追问回访成功');
						}
						return falg;*/
						if (answerData.length > 0)
							listAnswerInquiriesDTO[index] = answerData;
						if (inquiriesStr)
							$('input[type="radio"][optionID="' + optionID + '"]').parent().siblings('.inquiriesContent').html(inquiriesStr.join(''));
					}
				},
			},
		});
	}
})

function getFormatDate() {
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
	var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
	// var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();  
	// var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();  
	// var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();  
	return year + "-" + month + "-" + date;
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}