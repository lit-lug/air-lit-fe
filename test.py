import os 
import wave

dir_path = r"C:/Users/19489/Desktop/录音采集交付/复位/"

for file_name in os.listdir(dir_path): 
    if file_name.endswith(".wav"): wavFile = os.path.join(dir_path, file_name) 
    f = wave.open(wavFile) # 音频头 参数 
    params = f.getparams() 
    
    Channels = f.getnchannels() 
    SampleRate = f.getframerate() 
    
    print("文件名：", file_name)
    #print("音频头参数：", params)
    #print("通道数(Channels)：", Channels)
    print("采样率(SampleRate)：", SampleRate)
    #print("比特(Precision)：", bit_type)
    #print("采样点数(frames)：", frames)
    #print("帧数或者时间(Duration)：", Duration)
    print("\n")