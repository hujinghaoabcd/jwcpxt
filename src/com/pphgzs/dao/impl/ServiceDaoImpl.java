package com.pphgzs.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pphgzs.dao.ServiceDao;
import com.pphgzs.domain.DO.jwcpxt_service_client;
import com.pphgzs.domain.DO.jwcpxt_service_definition;
import com.pphgzs.domain.DO.jwcpxt_service_instance;
import com.pphgzs.domain.DTO.ServiceDefinitionDTO;
import com.pphgzs.domain.VO.ServiceDefinitionVO;

public class ServiceDaoImpl implements ServiceDao {
	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public Session getSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public int get_serviceDefinitionTotalCount_byServiceDefinitionVO(ServiceDefinitionVO serviceDefinitionVO) {
		Session session = getSession();
		String hql = "select count(*) from jwcpxt_service_definition serviceDefinition "
				+ " where serviceDefinition.service_definition_describe like :screenSearch and serviceDefinition.service_definition_unit like :screenUnit ";
		Query query = session.createQuery(hql);
		//
		if (serviceDefinitionVO.getScreenSearch().equals("")) {
			query.setParameter("screenSearch", "%%");
		} else {
			query.setParameter("screenSearch", "%" + serviceDefinitionVO.getScreenSearch() + "%");
		}
		if (serviceDefinitionVO.getScreenUnit().equals("")) {
			query.setParameter("screenUnit", "%%");
		} else {
			query.setParameter("screenUnit", "%" + serviceDefinitionVO.getScreenUnit() + "%");
		}
		//
		int count = ((Number) query.uniqueResult()).intValue();
		//
		session.clear();
		return count;
	}

	@Override
	public List<jwcpxt_service_client> list_client_byServiceInstanceID(String serviceInstanceID) {

		Session session = getSession();
		String hql = "from jwcpxt_service_client serviceClient where serviceClient.service_client_service_instance=:serviceInstanceID";
		Query query = session.createQuery(hql);
		//
		query.setParameter("serviceInstanceID", serviceInstanceID);
		//
		List<jwcpxt_service_client> list = query.list();
		session.clear();
		return list;
	}

	@Override
	public List<jwcpxt_service_client> list_serviceClient_byServiceInstanceID(String serviceInstanceID) {
		Session session = getSession();
		String hql = "from jwcpxt_service_client serviceClient where serviceClient.service_client_service_instance=:serviceInstanceID";
		Query query = session.createQuery(hql);
		//
		query.setParameter("serviceInstanceID", serviceInstanceID);
		//
		List<jwcpxt_service_client> list = query.list();
		session.clear();
		return list;
	}

	@Override
	public List<jwcpxt_service_instance> list_serviceInstance_byServiceDefinitionID(String serviceDefinitionID) {
		Session session = getSession();
		String hql = "from jwcpxt_service_instance serviceInstance where serviceInstance.service_instance_service_definition=:serviceDefinitionID";
		Query query = session.createQuery(hql);
		//
		query.setParameter("serviceDefinitionID", serviceDefinitionID);
		//
		List<jwcpxt_service_instance> list = query.list();
		session.clear();
		return list;
	}

	@Override
	public ServiceDefinitionDTO get_serviceDefinitionDTO_byServiceDefinitionID(String serviceDefinitionID) {
		Session session = getSession();
		String hql = "select new com.pphgzs.domain.DTO.ServiceDefinitionDTO(serviceDefinition,unit) from jwcpxt_service_definition serviceDefinition , jwcpxt_unit unit"
				+ " where serviceDefinition.service_definition_unit=unit.jwcpxt_unit_id and serviceDefinition.jwcpxt_service_definition_id = :serviceDefinitionID ";
		//
		Query query = session.createQuery(hql);
		//
		query.setParameter("serviceDefinitionID", serviceDefinitionID);
		//
		ServiceDefinitionDTO serviceDefinitionDTO = (ServiceDefinitionDTO) query.uniqueResult();
		session.clear();
		return serviceDefinitionDTO;
	}

	@Override
	public List<ServiceDefinitionDTO> list_serviceDefinitionDTO_byUserVO(ServiceDefinitionVO serviceDefinitionVO) {
		Session session = getSession();
		String hql = "select new com.pphgzs.domain.DTO.ServiceDefinitionDTO(serviceDefinition,unit)  from jwcpxt_service_definition serviceDefinition , jwcpxt_unit unit"
				+ " where serviceDefinition.service_definition_unit=unit.jwcpxt_unit_id and serviceDefinition.service_definition_describe like :screenSearch and serviceDefinition.service_definition_unit like :screenUnit "
				+ " order by service_definition_unit";
		Query query = session.createQuery(hql);
		//
		if (serviceDefinitionVO.getScreenSearch().equals("")) {
			query.setParameter("screenSearch", "%%");
		} else {
			query.setParameter("screenSearch", "%" + serviceDefinitionVO.getScreenSearch() + "%");
		}
		if (serviceDefinitionVO.getScreenUnit().equals("")) {
			query.setParameter("screenUnit", "%%");
		} else {
			query.setParameter("screenUnit", "%" + serviceDefinitionVO.getScreenUnit() + "%");
		}
		query.setFirstResult((serviceDefinitionVO.getCurrPage() - 1) * serviceDefinitionVO.getPageSize());
		query.setMaxResults(serviceDefinitionVO.getPageSize());
		//
		List<ServiceDefinitionDTO> list = null;
		list = query.list();
		session.clear();
		return list;
	}

	@Override
	public boolean ifExist_serviceDefinition_byServiceDefinitionDescribe(String service_definition_describe) {
		Session session = getSession();

		String hql = "from jwcpxt_service_definition where service_definition_describe=:definitionDescribe";
		Query query = session.createQuery(hql);
		//
		query.setParameter("definitionDescribe", service_definition_describe);
		//
		jwcpxt_service_definition serviceDefinition = (jwcpxt_service_definition) query.uniqueResult();
		session.clear();
		if (serviceDefinition != null) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public jwcpxt_service_definition get_serviceDefinition_byServiceDefinitionID(String serviceDefinitionID) {
		Session session = getSession();
		String hql = "from jwcpxt_service_definition where jwcpxt_service_definition_id=:serviceDefinitionID ";
		//
		Query query = session.createQuery(hql);
		//
		query.setParameter("serviceDefinitionID", serviceDefinitionID);
		//
		jwcpxt_service_definition serviceDefinition = (jwcpxt_service_definition) query.uniqueResult();
		session.clear();
		return serviceDefinition;
	}

	@Override
	public jwcpxt_service_instance get_serviceInstance_byServiceInstanceID(String serviceInstanceID) {
		Session session = getSession();
		String hql = "from jwcpxt_service_instance where service_instance_service_definition=:serviceInstanceID ";
		//
		Query query = session.createQuery(hql);
		//
		query.setParameter("serviceInstanceID", serviceInstanceID);
		//
		jwcpxt_service_instance serviceInstance = (jwcpxt_service_instance) query.uniqueResult();
		session.clear();
		return serviceInstance;
	}

	@Override
	public boolean update_serviceInstance(jwcpxt_service_instance serviceInstance) {
		Session session = getSession();
		session.update(serviceInstance);
		session.flush();
		return true;
	}

	@Override
	public boolean update_serviceDefinition(jwcpxt_service_definition serviceDefinitionOld) {
		Session session = getSession();
		session.update(serviceDefinitionOld);
		session.flush();
		return true;
	}

	@Override
	public boolean save_serviceDefinition(jwcpxt_service_definition serviceDefinition) {
		Session session = getSession();
		session.save(serviceDefinition);
		session.flush();
		return true;
	}
	/*
	 * 
	 */
}
