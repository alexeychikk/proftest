(function(angular, undefined) {
  angular.module("proftestApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"moder",
		"admin"
	],
	"testTypes": {
		"SYSTEM_PROF_CHOICE": "SYSTEM_PROF_CHOICE",
		"TEENAGE_KETTEL": "TEENAGE_KETTEL",
		"PROF_READINESS": "PROF_READINESS",
		"PSYCHOGEOMETRICAL": "PSYCHOGEOMETRICAL",
		"THINKING_CREATIVITY": "THINKING_CREATIVITY"
	}
})

;
})(angular);