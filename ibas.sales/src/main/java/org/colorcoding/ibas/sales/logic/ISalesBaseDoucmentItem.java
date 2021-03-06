package org.colorcoding.ibas.sales.logic;

/**
 * 销售的基于单据行项目
 * 
 * @author Niuren.Zhu
 *
 */
public interface ISalesBaseDoucmentItem extends ISalesBaseDoucment {

	/**
	 * 基于单据行号
	 * 
	 * @return
	 */
	Integer getBaseDocumentLineId();

}
