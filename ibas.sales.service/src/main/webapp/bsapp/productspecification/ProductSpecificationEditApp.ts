/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
 namespace sales {
    export namespace app {
        /** 编辑应用-产品规格 */
        export class ProductSpecificationEditApp extends ibas.BOEditApplication<IProductSpecificationEditView, bo.ProductSpecification> {

            /** 应用标识 */
            static APPLICATION_ID: string = "7bdfae43-fa9d-4e86-a9f8-1fe9eb2a5092";
            /** 应用名称 */
            static APPLICATION_NAME: string = "sales_app_productspecification_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.ProductSpecification.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = ProductSpecificationEditApp.APPLICATION_ID;
                this.name = ProductSpecificationEditApp.APPLICATION_NAME;
                this.boCode = ProductSpecificationEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.addProductSpecificationItemEvent = this.addProductSpecificationItem;
                this.view.removeProductSpecificationItemEvent = this.removeProductSpecificationItem;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.ProductSpecification();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showProductSpecification(this.editData);
                this.view.showProductSpecificationItems(this.editData.productSpecificationItems.filterDeleted());
            }
            run(): void;
            run(data: bo.ProductSpecification): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.ProductSpecification)) {
                    let data: bo.ProductSpecification = arguments[0];
                    // 新对象直接编辑
                    if (data.isNew) {
                        that.editData = data;
                        that.show();
                        return;
                    }
                    // 尝试重新查询编辑对象
                    let criteria: ibas.ICriteria = data.criteria();
                    if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                        // 有效的查询对象查询
                        let boRepository: bo.BORepositorySales = new bo.BORepositorySales();
                        boRepository.fetchProductSpecification({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.ProductSpecification>): void {
                                let data: bo.ProductSpecification;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.ProductSpecification)) {
                                    // 查询到了有效数据
                                    that.editData = data;
                                    that.show();
                                } else {
                                    // 数据重新检索无效
                                    that.messages({
                                        type: ibas.emMessageType.WARNING,
                                        message: ibas.i18n.prop("shell_data_deleted_and_created"),
                                        onCompleted(): void {
                                            that.show();
                                        }
                                    });
                                }
                            }
                        });
                        return; // 退出
                    }
                }
                super.run.apply(this, arguments);
            }
            /** 待编辑的数据 */
            protected editData: bo.ProductSpecification;
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositorySales = new bo.BORepositorySales();
                boRepository.saveProductSpecification({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.ProductSpecification>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                // 删除成功，释放当前对象
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                that.editData = undefined;
                            } else {
                                // 替换编辑对象
                                that.editData = opRslt.resultObjects.firstOrDefault();
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                            }
                            // 刷新当前视图
                            that.viewShowed();
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 删除数据 */
            protected deleteData(): void {
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_delete_continue"),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action === ibas.emMessageAction.YES) {
                            that.editData.delete();
                            that.saveData();
                        }
                    }
                });
            }
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void {
                let that: this = this;
                let createData: Function = function (): void {
                    if (clone) {
                        // 克隆对象
                        that.editData = that.editData.clone();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                        that.viewShowed();
                    } else {
                        // 新建对象
                        that.editData = new bo.ProductSpecification();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                        that.viewShowed();
                    }
                };
                if (that.editData.isDirty) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_data_not_saved_continue"),
                        actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                        onCompleted(action: ibas.emMessageAction): void {
                            if (action === ibas.emMessageAction.YES) {
                                createData();
                            }
                        }
                    });
                } else {
                    createData();
                }
            }
            /** 添加产品规格-项目事件 */
            protected addProductSpecificationItem(): void {
                this.editData.productSpecificationItems.create();
                // 仅显示没有标记删除的
                this.view.showProductSpecificationItems(this.editData.productSpecificationItems.filterDeleted());
            }
            /** 删除产品规格-项目事件 */
            protected removeProductSpecificationItem(items: bo.ProductSpecificationItem[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editData.productSpecificationItems.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editData.productSpecificationItems.remove(item);
                        } else {
                            // 非新建标记删除
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showProductSpecificationItems(this.editData.productSpecificationItems.filterDeleted());
            }

        }
        /** 视图-产品规格 */
        export interface IProductSpecificationEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showProductSpecification(data: bo.ProductSpecification): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加产品规格-项目事件 */
            addProductSpecificationItemEvent: Function;
            /** 删除产品规格-项目事件 */
            removeProductSpecificationItemEvent: Function;
            /** 显示数据 */
            showProductSpecificationItems(datas: bo.ProductSpecificationItem[]): void;
        }
    }
}
