package com.pphgzs.domain.DTO;

import java.util.List;

import com.pphgzs.domain.DO.jwcpxt_unit;

//单位下所有的业务分数
public class UnitHaveServiceGradeDTO {
	private jwcpxt_unit unit;
	private List<ServiceGradeBelongUnitDTO> serviceGradeBelongUnitDTOList;
	private int totalGrade;

	public int getTotalGrade() {
		return totalGrade;
	}

	public void setTotalGrade(int totalGrade) {
		this.totalGrade = totalGrade;
	}

	public jwcpxt_unit getUnit() {
		return unit;
	}

	public void setUnit(jwcpxt_unit unit) {
		this.unit = unit;
	}

	public List<ServiceGradeBelongUnitDTO> getServiceGradeBelongUnitDTOList() {
		return serviceGradeBelongUnitDTOList;
	}

	public void setServiceGradeBelongUnitDTOList(List<ServiceGradeBelongUnitDTO> serviceGradeBelongUnitDTOList) {
		this.serviceGradeBelongUnitDTOList = serviceGradeBelongUnitDTOList;
	}

}
