angular.module("managerApp").controller("NashaPartitionAccessDeleteCtrl", function ($scope, $translate, $uibModalInstance, OvhApiDedicatedNasha, CloudMessage) {
    "use strict";

    var self = this;
    self.loading = false;
    self.toRemove = {
        serviceName: $scope.$resolve.items.serviceName,
        partitionName: $scope.$resolve.items.partitionName,
        access: $scope.$resolve.items.access
    };

    self.removeAccess = function () {
        self.loading = true;
        OvhApiDedicatedNasha.Partition().Access().v6().remove({
            serviceName: self.toRemove.serviceName,
            partitionName: self.toRemove.partitionName,
            ip: self.toRemove.access.ip
        }).$promise.then(function (result) {
            $uibModalInstance.close({ access: self.toRemove.access, task: result.data.taskId });
            CloudMessage.success($translate.instant("nasha_access_action_delete_success", { accessIp: self.toRemove.access.ip }));
        }).catch(function () {
            $uibModalInstance.dismiss();
            CloudMessage.error($translate.instant("nasha_access_action_delete_failure", { accessIp: self.toRemove.access.ip }));
        }).finally(function () {
            self.loading = false;
        });
    };

    self.dismiss = function () {
        $uibModalInstance.dismiss();
    };
});
