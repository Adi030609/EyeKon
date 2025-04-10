@socketio.on('eye_fatigue_score')
# def handle_eye_fatigue_score(data):
#     efs = data.get('efs')
#     if efs is not None:
#         print(f"[Server] EFS received: {efs}")
#         auto_adjust_screen(float(efs)) 
#     emit('efs_ack', {'status': 'received'})