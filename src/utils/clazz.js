export function getShapeName(clazz) {
  switch (clazz) {
    case 'start': return 'start-node';
    case 'end': return 'end-node';
    case 'gateway': return 'gateway-node';
    case 'exclusiveGateway': return 'exclusive-gateway-node';
    case 'parallelGateway': return 'parallel-gateway-node';
    case 'inclusiveGateway': return 'inclusive-gateway-node';
    case 'timerStart': return 'timer-start-node';
    case 'messageStart': return 'message-start-node';
    case 'signalStart': return 'signal-start-node';
    case 'userTask': return 'user-task-node';
    case 'scriptTask': return 'script-task-node';
    case 'mailTask': return 'mail-task-node';
    case 'javaTask': return 'java-task-node';
    case 'receiveTask': return 'receive-task-node';
    case 'timerCatch': return 'timer-catch-node';
    case 'messageCatch': return 'message-catch-node';
    case 'signalCatch': return 'signal-catch-node';
    case 'subProcess': return 'sub-process-node';
    case 'database': return 'script-task-node';
    case 'parse': return 'java-task-node';
    case 'request': return 'mail-task-node';
    case 'verification': return 'receive-task-node';
    case 'compare_path': return 'receive-task-node';
    case 'compare_obj': return 'receive-task-node';
    case 'tidb': return 'script-task-node';
    case 'druid': return 'script-task-node';
    case 'condition_if': return 'inclusive-gateway-node';
    case 'condition_for': return 'inclusive-gateway-node';
    case 'sonar': return 'mail-task-node';
    default: return 'task-node';
  }
}
