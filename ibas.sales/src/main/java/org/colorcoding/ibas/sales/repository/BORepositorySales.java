package org.colorcoding.ibas.sales.repository;

import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;
import org.colorcoding.ibas.sales.bo.productspecification.IProductSpecification;
import org.colorcoding.ibas.sales.bo.productspecification.ProductSpecification;
import org.colorcoding.ibas.sales.bo.productsuit.IProductSuit;
import org.colorcoding.ibas.sales.bo.productsuit.ProductSuit;
import org.colorcoding.ibas.sales.bo.salesdelivery.ISalesDelivery;
import org.colorcoding.ibas.sales.bo.salesdelivery.SalesDelivery;
import org.colorcoding.ibas.sales.bo.salesorder.ISalesOrder;
import org.colorcoding.ibas.sales.bo.salesorder.SalesOrder;
import org.colorcoding.ibas.sales.bo.salesquote.ISalesQuote;
import org.colorcoding.ibas.sales.bo.salesquote.SalesQuote;
import org.colorcoding.ibas.sales.bo.salesreturn.ISalesReturn;
import org.colorcoding.ibas.sales.bo.salesreturn.SalesReturn;
import org.colorcoding.ibas.sales.bo.specification.ISpecification;
import org.colorcoding.ibas.sales.bo.specification.Specification;
import org.colorcoding.ibas.sales.bo.specification.SpecificationTree;
import org.colorcoding.ibas.sales.data.emSpecificationTarget;

/**
 * Sales仓库
 */
public class BORepositorySales extends BORepositoryServiceApplication
		implements IBORepositorySalesSvc, IBORepositorySalesApp {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-产品规格
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ProductSpecification> fetchProductSpecification(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ProductSpecification.class);
	}

	/**
	 * 查询-产品规格（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IProductSpecification> fetchProductSpecification(ICriteria criteria) {
		return new OperationResult<IProductSpecification>(
				this.fetchProductSpecification(criteria, this.getUserToken()));
	}

	/**
	 * 保存-产品规格
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ProductSpecification> saveProductSpecification(ProductSpecification bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-产品规格（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IProductSpecification> saveProductSpecification(IProductSpecification bo) {
		return new OperationResult<IProductSpecification>(
				this.saveProductSpecification((ProductSpecification) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-产品套装
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ProductSuit> fetchProductSuit(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ProductSuit.class);
	}

	/**
	 * 查询-产品套装（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IProductSuit> fetchProductSuit(ICriteria criteria) {
		return new OperationResult<IProductSuit>(this.fetchProductSuit(criteria, this.getUserToken()));
	}

	/**
	 * 保存-产品套装
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ProductSuit> saveProductSuit(ProductSuit bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-产品套装（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IProductSuit> saveProductSuit(IProductSuit bo) {
		return new OperationResult<IProductSuit>(this.saveProductSuit((ProductSuit) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-销售交货
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<SalesDelivery> fetchSalesDelivery(ICriteria criteria, String token) {
		return super.fetch(criteria, token, SalesDelivery.class);
	}

	/**
	 * 查询-销售交货（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<ISalesDelivery> fetchSalesDelivery(ICriteria criteria) {
		return new OperationResult<ISalesDelivery>(this.fetchSalesDelivery(criteria, this.getUserToken()));
	}

	/**
	 * 保存-销售交货
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<SalesDelivery> saveSalesDelivery(SalesDelivery bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-销售交货（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<ISalesDelivery> saveSalesDelivery(ISalesDelivery bo) {
		return new OperationResult<ISalesDelivery>(this.saveSalesDelivery((SalesDelivery) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-销售订单
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<SalesOrder> fetchSalesOrder(ICriteria criteria, String token) {
		return super.fetch(criteria, token, SalesOrder.class);
	}

	/**
	 * 查询-销售订单（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<ISalesOrder> fetchSalesOrder(ICriteria criteria) {
		return new OperationResult<ISalesOrder>(this.fetchSalesOrder(criteria, this.getUserToken()));
	}

	/**
	 * 保存-销售订单
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<SalesOrder> saveSalesOrder(SalesOrder bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-销售订单（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<ISalesOrder> saveSalesOrder(ISalesOrder bo) {
		return new OperationResult<ISalesOrder>(this.saveSalesOrder((SalesOrder) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-销售退货
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<SalesReturn> fetchSalesReturn(ICriteria criteria, String token) {
		return super.fetch(criteria, token, SalesReturn.class);
	}

	/**
	 * 查询-销售退货（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<ISalesReturn> fetchSalesReturn(ICriteria criteria) {
		return new OperationResult<ISalesReturn>(this.fetchSalesReturn(criteria, this.getUserToken()));
	}

	/**
	 * 保存-销售退货
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<SalesReturn> saveSalesReturn(SalesReturn bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-销售退货（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<ISalesReturn> saveSalesReturn(ISalesReturn bo) {
		return new OperationResult<ISalesReturn>(this.saveSalesReturn((SalesReturn) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-销售报价
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<SalesQuote> fetchSalesQuote(ICriteria criteria, String token) {
		return super.fetch(criteria, token, SalesQuote.class);
	}

	/**
	 * 查询-销售报价（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<ISalesQuote> fetchSalesQuote(ICriteria criteria) {
		return new OperationResult<ISalesQuote>(this.fetchSalesQuote(criteria, this.getUserToken()));
	}

	/**
	 * 保存-销售报价
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<SalesQuote> saveSalesQuote(SalesQuote bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-销售报价（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<ISalesQuote> saveSalesQuote(ISalesQuote bo) {
		return new OperationResult<ISalesQuote>(this.saveSalesQuote((SalesQuote) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-规格模板
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Specification> fetchSpecification(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Specification.class);
	}

	/**
	 * 查询-规格模板（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<ISpecification> fetchSpecification(ICriteria criteria) {
		return new OperationResult<ISpecification>(this.fetchSpecification(criteria, this.getUserToken()));
	}

	/**
	 * 保存-规格模板
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Specification> saveSpecification(Specification bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-规格模板（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<ISpecification> saveSpecification(ISpecification bo) {
		return new OperationResult<ISpecification>(this.saveSpecification((Specification) bo, this.getUserToken()));
	}

	@Override
	public IOperationResult<SpecificationTree> fetchSpecificationTree(ICriteria criteria) {
		return this.fetchSpecificationTree(criteria, this.getUserToken());
	}

	@Override
	public OperationResult<SpecificationTree> fetchSpecificationTree(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			if (criteria == null) {
				throw new Exception(I18N.prop("msg_bobas_invaild_criteria"));
			}
			// 模板查询
			ICriteria tCriteria = new Criteria();
			for (ICondition item : criteria.getConditions()) {
				if (!item.getAlias().equalsIgnoreCase("Template")) {
					continue;
				}
				ICondition condition = tCriteria.getConditions().create();
				condition.setAlias(Specification.PROPERTY_OBJECTKEY.getName());
				condition.setValue(item.getValue());
			}
			// 没有明确模板编号
			if (tCriteria.getConditions().isEmpty()) {
				for (ICondition item : criteria.getConditions()) {
					if (item.getAlias().equalsIgnoreCase("Material")) {
						// 物料条件
						ICondition condition = tCriteria.getConditions().create();
						condition.setBracketOpen(1);
						condition.setAlias(Specification.PROPERTY_TARGETTYPE.getName());
						condition.setValue(emSpecificationTarget.MATERIAL);
						condition = tCriteria.getConditions().create();
						condition.setBracketClose(1);
						condition.setAlias(Specification.PROPERTY_TARGET.getName());
						condition.setValue(item.getValue());
						// 物料的组
						ICriteria mCriteria = new Criteria();
						ICondition mCondition = mCriteria.getConditions().create();
						mCondition.setAlias(Material.PROPERTY_CODE.getName());
						mCondition.setValue(item.getValue());
						BORepositoryMaterials boRepository = new BORepositoryMaterials();
						boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
						IMaterial material = boRepository.fetchMaterial(mCriteria).getResultObjects().firstOrDefault();
						if (material != null && material.getGroup() != null) {
							condition = tCriteria.getConditions().create();
							condition.setBracketOpen(1);
							condition.setAlias(Specification.PROPERTY_TARGETTYPE.getName());
							condition.setValue(emSpecificationTarget.MATERIAL_GROUP);
							condition.setRelationship(ConditionRelationship.OR);
							condition = tCriteria.getConditions().create();
							condition.setBracketClose(1);
							condition.setAlias(Specification.PROPERTY_TARGET.getName());
							condition.setValue(material.getGroup());
						}
					} else if (item.getAlias().equalsIgnoreCase("MaterialGroup")) {
						ICondition condition = tCriteria.getConditions().create();
						condition.setAlias(Specification.PROPERTY_TARGETTYPE.getName());
						condition.setValue(emSpecificationTarget.MATERIAL_GROUP);
						condition = tCriteria.getConditions().create();
						condition.setAlias(Specification.PROPERTY_TARGET.getName());
						condition.setValue(item.getValue());
					}
				}
			}
			IOperationResult<ISpecification> opRsltSpec = this.fetchSpecification(tCriteria);
			if (opRsltSpec.getError() != null) {
				throw opRsltSpec.getError();
			}
			OperationResult<SpecificationTree> operationResult = new OperationResult<>();
			for (ISpecification item : opRsltSpec.getResultObjects()) {
				operationResult.addResultObjects(SpecificationTree.create(item));
			}
			return operationResult;
		} catch (Exception e) {
			Logger.log(e);
			return new OperationResult<>(e);
		}
	}
	// --------------------------------------------------------------------------------------------//

}
