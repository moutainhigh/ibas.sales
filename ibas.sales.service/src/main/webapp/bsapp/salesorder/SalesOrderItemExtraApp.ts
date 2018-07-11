/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace sales {
    export namespace app {
        /** 列表应用-销售订单项目-额外 */
        export class SalesOrderItemExtraApp extends ibas.Application<ISalesOrderItemExtraView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "b7708212-1de7-4bee-9d10-6a3cd3993dac";
            /** 应用名称 */
            static APPLICATION_NAME: string = "sales_app_salesorder_extra_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = SalesOrderItemExtraApp.APPLICATION_ID;
                this.name = SalesOrderItemExtraApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.addSalesOrderItemExtraEvent = this.addSalesOrderItemExtra;
                this.view.removeSalesOrderItemExtraEvent = this.removeSalesOrderItemExtra;
                this.view.deleteSalesOrderItemExtraEvent = this.deleteSalesOrderItemExtra;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.view.showData(this.editData);
                this.view.showExtraDatas(this.editData.salesOrderItemExtras.filterDeleted());
            }
            run(): void;
            run(data: bo.SalesOrderItem): void;
            run(): void {
                let data: bo.SalesOrderItem = arguments[0];
                if (data instanceof bo.SalesOrderItem) {
                    this.editData = data;
                    super.run();
                } else {
                    throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
                }
            }
            private editData: bo.SalesOrderItem;
            /** 添加销售订单-行事件 */
            private addSalesOrderItemExtra(type: string): void {
                if (type === bo.ProductSpecification.BUSINESS_OBJECT_CODE) {
                    let that: this = this;
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        message: ibas.i18n.prop("sales_create_continue", ibas.i18n.prop("bo_productspecification")),
                        actions: [
                            ibas.emMessageAction.YES,
                            ibas.emMessageAction.NO
                        ],
                        /** 调用完成 */
                        onCompleted(action: ibas.emMessageAction): void {
                            if (action === ibas.emMessageAction.YES) {

                            } else {
                                ibas.servicesManager.runChooseService<bo.IProductSpecification>({
                                    boCode: bo.BO_CODE_PRODUCTSPECIFICATION,
                                    criteria: [],
                                    onCompleted(selecteds: ibas.IList<bo.IProductSpecification>): void {
                                        for (let selected of selecteds) {
                                            let item: bo.SalesOrderItemExtra = that.editData.salesOrderItemExtras.create();
                                            item.extraType = selected.objectCode;
                                            item.extraKey = selected.objectKey;
                                        }
                                        this.view.showExtraDatas(this.editData.salesOrderItemExtras.filterDeleted());
                                    }
                                });
                            }
                        }
                    });
                } else {
                    this.editData.salesOrderItemExtras.create();
                    // 仅显示没有标记删除的
                    this.view.showExtraDatas(this.editData.salesOrderItemExtras.filterDeleted());
                }
            }
            /** 删除销售订单-行事件 */
            private removeSalesOrderItemExtra(items: bo.SalesOrderItemExtra[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editData.salesOrderItemExtras.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editData.salesOrderItemExtras.remove(item);
                        } else {
                            // 非新建标记删除
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showExtraDatas(this.editData.salesOrderItemExtras.filterDeleted());
            }
            private deleteSalesOrderItemExtra(data: bo.SalesOrderItemExtra): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_delete")
                    ));
                    return;
                }
                if (!ibas.objects.isNull(data.extraKey)) {
                    if (data.extraType === bo.ProductSpecification.BUSINESS_OBJECT_CODE) {
                        this.busy(true);
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        criteria.result = 1;
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.ProductSpecification.PROPERTY_OBJECTKEY_NAME;
                        condition.value = data.extraKey.toString();
                        let that: this = this;
                        let boRepository: bo.BORepositorySales = new bo.BORepositorySales();
                        boRepository.fetchProductSpecification({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.ProductSpecification>): void {
                                try {
                                    that.busy(false);
                                    if (opRslt.resultCode !== 0) {
                                        throw new Error(opRslt.message);
                                    }
                                    for (let item of opRslt.resultObjects) {
                                        that.messages({
                                            type: ibas.emMessageType.QUESTION,
                                            message: ibas.i18n.prop("sales_delete_continue", ibas.i18n.prop("bo_productspecification"), item.name),
                                            actions: [
                                                ibas.emMessageAction.YES,
                                                ibas.emMessageAction.NO
                                            ],
                                            /** 调用完成 */
                                            onCompleted(action: ibas.emMessageAction): void {
                                                if (action !== ibas.emMessageAction.YES) {
                                                    return;
                                                }
                                                item.delete();
                                                boRepository.saveProductSpecification({
                                                    beSaved: item,
                                                    onCompleted(opRslt: ibas.IOperationResult<bo.ProductSpecification>): void {
                                                        try {
                                                            that.busy(false);
                                                            if (opRslt.resultCode !== 0) {
                                                                throw new Error(opRslt.message);
                                                            }
                                                        } catch (error) {
                                                            that.proceeding(error);
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                } catch (error) {
                                    that.proceeding(error);
                                }
                            }
                        });
                    }
                }
                this.removeSalesOrderItemExtra([data]);
            }
        }
        /** 视图-销售订单项目-额外 */
        export interface ISalesOrderItemExtraView extends ibas.IBOView {
            /** 显示数据 */
            showData(data: bo.SalesOrderItem): void;
            /** 显示额外数据 */
            showExtraDatas(datas: bo.SalesOrderItemExtra[]): void;
            /** 添加销售订单-行额外 事件 */
            addSalesOrderItemExtraEvent: Function;
            /** 移出销售订单-行额外 事件 */
            removeSalesOrderItemExtraEvent: Function;
            /** 删除销售订单-行额外 事件 */
            deleteSalesOrderItemExtraEvent: Function;
        }
    }
}