import cv2
import mediapipe as mp

def analyze_eye_contact(video_path):
    mp_face_mesh = mp.solutions.face_mesh
    video = cv2.VideoCapture(video_path)
    eye_focus_count = 0
    total_frames = 0

    with mp_face_mesh.FaceMesh(refine_landmarks=True, static_image_mode=False) as face_mesh:
        while True:
            success, frame = video.read()
            if not success:
                break
            total_frames += 1
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            result = face_mesh.process(frame_rgb)

            if result.multi_face_landmarks:
                landmarks = result.multi_face_landmarks[0].landmark
                left_eye_x = landmarks[33].x
                right_eye_x = landmarks[263].x
                nose_tip_x = landmarks[1].x

                if left_eye_x < nose_tip_x < right_eye_x:
                    eye_focus_count += 1

    video.release()
    eye_focus_percent = (eye_focus_count / total_frames) * 100 if total_frames > 0 else 0
    return {"eye_contact_percent": round(eye_focus_percent, 2)}
