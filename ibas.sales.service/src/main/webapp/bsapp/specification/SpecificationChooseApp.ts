/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace sales {
    export namespace app {
        /** 选择应用-规格模板 */
        export class SpecificationChooseApp extends ibas.BOChooseService<ISpecificationChooseView, bo.Specification> {

            /** 应用标识 */
            static APPLICATION_ID: string = "a7475b1f-fb8c-4702-8905-a906c2072467";
            /** 应用名称 */
            static APPLICATION_NAME: string = "sales_app_specification_choose";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Specification.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = SpecificationChooseApp.APPLICATION_ID;
                this.name = SpecificationChooseApp.APPLICATION_NAME;
                this.boCode = SpecificationChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositorySales = new bo.BORepositorySales();
                boRepository.fetchSpecification({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Specification>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 1
                                && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true) && !that.isViewShowed()) {
                                // 仅一条数据，直接选择
                                that.chooseData(opRslt.resultObjects);
                            } else {
                                if (!that.isViewShowed()) {
                                    // 没显示视图，先显示
                                    that.show();
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                                }
                                that.view.showData(opRslt.resultObjects);
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
                // 关闭自身
                this.destroy();
                // 调用编辑应用
                let app: SpecificationEditApp = new SpecificationEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
        }
        /** 视图-规格模板 */
        export interface ISpecificationChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Specification[]): void;
        }
        /** 规格模板选择服务映射 */
        export class SpecificationChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = SpecificationChooseApp.APPLICATION_ID;
                this.name = SpecificationChooseApp.APPLICATION_NAME;
                this.boCode = SpecificationChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.Specification> {
                return new SpecificationChooseApp();
            }
        }
    }
}