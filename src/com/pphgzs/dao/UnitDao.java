package com.pphgzs.dao;

import java.util.List;

import com.pphgzs.domain.DO.jwcpxt_unit;
import com.pphgzs.domain.DO.jwcpxt_unit_service;

public interface UnitDao {

	public List<jwcpxt_unit> list_unitDO_all();

	public int get_unitTotalRecords();

	public boolean save_unit(jwcpxt_unit unit);

	public boolean delete_unit(jwcpxt_unit unit);

	public jwcpxt_unit get_unitDO_byID(String unitID);

	public boolean update_unit(jwcpxt_unit unit);

	jwcpxt_unit get_unit_byNameOrAccount(String unit_name, String account);

	public List<jwcpxt_unit> list_unitDO_byOneAndTwo();

	public List<jwcpxt_unit> list_unitDO_byFatherUnitID(String jwcpxt_unit_id);

	public List<jwcpxt_unit> list_unitDO_byDistributionService();

	public List<jwcpxt_unit_service> list_unitServiceDO_all();

}
